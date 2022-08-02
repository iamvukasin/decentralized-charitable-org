%lang starknet

from contracts.Utils import is_gt, is_lt, uint256_gt, uint256_gte, uint256_lt
from openzeppelin.security.safemath import SafeUint256
from openzeppelin.token.erc20.interfaces.IERC20 import IERC20
from starkware.cairo.common.bool import FALSE, TRUE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_lt, assert_not_zero, assert_not_equal
from starkware.cairo.common.uint256 import ALL_ONES, Uint256, uint256_eq, uint256_sub
from starkware.starknet.common.syscalls import get_caller_address

#
# Events
#

@event
func Donate(user : felt, asset : felt, amount : Uint256, target : felt):
end

#
# Storage variables
#

@storage_var
func targetCount() -> (count : felt):
end

@storage_var
func targetBalances(target : felt) -> (balance : Uint256):
end

@storage_var
func targetGoals(target : felt) -> (goal : Uint256):
end

@storage_var
func targetDeadlines(target : felt) -> (deadline : felt):
end

namespace TargetBalances:
    #
    # Structs
    #

    struct TargetWrapper:
        member balance : Uint256
        member goal : Uint256
        member deadline : felt
    end

    #
    # Helpers
    #

    func is_funded{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        target : felt
    ) -> (funded : felt):
        alloc_locals

        let (_balance) = targetBalances.read(target)
        let (_goal) = targetGoals.read(target)
        let (_funded) = uint256_gte(_balance, _goal)

        return (_funded)
    end

    func get_most_urgent_target{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        best_target : felt, index : felt, best_left_to_goal : Uint256, min_deadline : felt
    ) -> (target : felt):
        alloc_locals

        let (_targetCount) = targetCount.read()

        if index == _targetCount:
            return (best_target)
        end

        let (_balance) = targetBalances.read(index)
        let (_goal) = targetGoals.read(index)
        let (_deadline) = targetDeadlines.read(index)
        let (_left) = uint256_sub(_goal, _balance)

        # The target is the first one, choose it automatically
        if min_deadline == 0:
            return get_most_urgent_target(index, index + 1, _left, _deadline)
        end

        # The target is not as urgent, continue searching
        let (is_gt_deadline) = is_gt(_deadline, min_deadline)
        if is_gt_deadline == TRUE:
            return get_most_urgent_target(best_target, index + 1, best_left_to_goal, min_deadline)
        end

        # The target is the most urgent one so far
        let (is_lt_deadline) = is_lt(_deadline, min_deadline)
        if is_lt_deadline == TRUE:
            return get_most_urgent_target(index, index + 1, _left, _deadline)
        end

        # Now on, _deadline == min_deadline is true

        # The target is not closest to the goal, continue searching
        let (is_gt_left) = uint256_gt(_left, best_left_to_goal)
        if is_gt_left == TRUE:
            return get_most_urgent_target(best_target, index + 1, best_left_to_goal, min_deadline)
        end

        return get_most_urgent_target(index, index + 1, _left, _deadline)
    end

    func get_unfunded_count{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        index : felt
    ) -> (count : felt):
        alloc_locals

        let (_targetCount) = targetCount.read()

        if index == _targetCount:
            return (0)
        end

        let (_previousCount) = get_unfunded_count(index + 1)
        let (_funded) = is_funded(index)

        if _funded == FALSE:
            return (_previousCount + 1)
        end

        return (_previousCount)
    end

    func donate_unfunded_each{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        index : felt, organization : felt, asset : felt, amount : Uint256
    ):
        alloc_locals

        let (_targetCount) = targetCount.read()

        if index == _targetCount:
            return ()
        end

        let (_funded) = is_funded(index)

        if _funded == FALSE:
            donate(organization, index, asset, amount)
            donate_unfunded_each(index + 1, organization, asset, amount)
            return ()
        end

        donate_unfunded_each(index + 1, organization, asset, amount)
        return ()
    end

    func get_best_fit_target{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        index : felt, amount : Uint256
    ) -> (target : felt, fit_diff : Uint256):
        alloc_locals

        let (_targetCount) = targetCount.read()

        if index == _targetCount:
            let max_uint256 = Uint256(ALL_ONES, ALL_ONES)
            return (-1, max_uint256)
        end

        let (best_target, best_fit_diff) = get_best_fit_target(index + 1, amount)

        let (_targetBalance) = targetBalances.read(index)
        let (_targetGoal) = targetGoals.read(index)
        let (_left) = uint256_sub(_targetGoal, _targetBalance)
        let (fit_diff) = uint256_sub(_left, amount)
        let (is_fit_diff_non_neg) = uint256_gte(fit_diff, Uint256(0, 0))

        if is_fit_diff_non_neg == TRUE:
            let (is_better_fit) = uint256_lt(fit_diff, best_fit_diff)

            if is_better_fit == TRUE:
                return (index, fit_diff)
            end
        end

        return (best_target, best_fit_diff)
    end

    #
    # Getters
    #

    func get_target{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _target : felt
    ) -> (target : TargetWrapper):
        let (_targetBalance) = targetBalances.read(_target)
        let (_targetGoal) = targetGoals.read(_target)
        let (_targetDeadline) = targetDeadlines.read(_target)

        let _reserve = TargetWrapper(
            balance=_targetBalance, goal=_targetGoal, deadline=_targetDeadline
        )
        return (_reserve)
    end

    #
    # Externals
    #

    func init_target{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _goal : Uint256, _deadline : felt
    ):
        let (_targetCount) = targetCount.read()
        targetBalances.write(_targetCount, Uint256(0, 0))
        targetGoals.write(_targetCount, _goal)
        targetDeadlines.write(_targetCount, _deadline)
        targetCount.write(_targetCount + 1)
        return ()
    end

    func donate{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _organization : felt, _target : felt, _asset : felt, _amount : Uint256
    ):
        alloc_locals

        with_attr error_message("TargetBalances: invalid target"):
            let (_targetCount) = targetCount.read()
            assert_lt(_target, _targetCount)
        end

        let (senderAddress) = get_caller_address()
        let (_balance) = targetBalances.read(_target)

        let (newBalance) = SafeUint256.add(_balance, _amount)
        targetBalances.write(_target, newBalance)

        # Emit donation event
        Donate.emit(user=senderAddress, asset=_asset, amount=_amount, target=_target)

        return ()
    end

    func priority_donate{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _organization : felt, asset : felt, _amount : Uint256
    ):
        alloc_locals

        let (_target) = get_most_urgent_target(0, 0, Uint256(0, 0), 0)

        donate(_organization, _target, asset, _amount)

        return ()
    end

    func donate_equally{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _organization : felt, asset : felt, _amount : Uint256
    ):
        alloc_locals

        let (_unfundedCount) = get_unfunded_count(0)

        with_attr error_message("TargetBalances: all targets funded"):
            assert_not_zero(_unfundedCount)
        end

        let unfundedCount = Uint256(_unfundedCount, 0)
        let (_amountPerTarget, rem) = SafeUint256.div_rem(_amount, unfundedCount)

        donate_unfunded_each(0, _organization, asset, _amountPerTarget)

        return ()
    end

    func best_fit_donate{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _organization : felt, asset : felt, _amount : Uint256
    ):
        alloc_locals

        let (_target, diff) = get_best_fit_target(0, _amount)

        with_attr error_message("TargetBalances: all targets funded"):
            assert_not_equal(_target, -1)
        end

        donate(_organization, _target, asset, _amount)

        return ()
    end
end
