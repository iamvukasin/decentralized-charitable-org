%lang starknet

from contracts.TargetBalances import TargetBalances
from openzeppelin.access.ownable import Ownable
from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256

#
# Constructor
#

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(owner : felt):
    Ownable.initializer(owner)
    return ()
end

#
# Getters
#

@view
func targetGet{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    target : felt
) -> (target : TargetBalances.TargetWrapper):
    return TargetBalances.targetGet(target)
end

#
# Externals
#

@external
func initTarget{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(goal : Uint256):
    Ownable.assert_only_owner()
    TargetBalances.initTarget(goal)
    return ()
end

@external
func donate{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    target : felt, asset : felt, amount : Uint256
):
    let (owner) = Ownable.owner()
    TargetBalances.donate(owner, target, asset, amount)
    return ()
end
