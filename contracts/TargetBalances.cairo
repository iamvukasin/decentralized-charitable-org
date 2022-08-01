%lang starknet

from contracts.Utils import is_gt, is_lt, uint256_gt
from openzeppelin.security.safemath import SafeUint256
from openzeppelin.token.erc20.interfaces.IERC20 import IERC20
from starkware.cairo.common.bool import FALSE, TRUE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_lt
from starkware.cairo.common.uint256 import Uint256, uint256_sub
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

        let (senderAddress) = get_caller_address()
        let (_target) = get_most_urgent_target(0, 0, Uint256(0, 0), 0)

        donate(_organization, _target, asset, _amount)

        return ()
    end
end
