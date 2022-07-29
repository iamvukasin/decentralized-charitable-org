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
func get_target{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    target : felt
) -> (target : TargetBalances.TargetWrapper):
    return TargetBalances.get_target(target)
end

#
# Externals
#

@external
func init_target{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(goal : Uint256):
    Ownable.assert_only_owner()
    TargetBalances.init_target(goal)
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
