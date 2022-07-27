%lang starknet

from openzeppelin.security.safemath import SafeUint256
from openzeppelin.token.erc20.interfaces.IERC20 import IERC20
from starkware.cairo.common.bool import FALSE, TRUE
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.math import assert_lt
from starkware.cairo.common.uint256 import Uint256
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
func targetGoal(target : felt) -> (goal : Uint256):
end

namespace TargetBalances:
    #
    # Structs
    #

    struct TargetWrapper:
        member balance : Uint256
        member goal : Uint256
    end

    #
    # Getters
    #

    func targetGet{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _target : felt
    ) -> (target : TargetWrapper):
        let (_targetBalance) = targetBalances.read(_target)
        let (_targetGoal) = targetGoal.read(_target)

        let _reserve = TargetWrapper(balance=_targetBalance, goal=_targetGoal)
        return (_reserve)
    end

    #
    # Externals
    #

    func initTarget{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        _goal : Uint256
    ):
        let (_targetCount) = targetCount.read()
        targetBalances.write(_targetCount, Uint256(0, 0))
        targetGoal.write(_targetCount, _goal)
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
end
