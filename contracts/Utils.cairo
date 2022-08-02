%lang starknet

from starkware.cairo.common.bool import FALSE, TRUE
from starkware.cairo.common.math_cmp import is_le, is_not_zero
from starkware.cairo.common.uint256 import Uint256, uint256_eq, uint256_le

# Felt comparison functions

func is_gt{range_check_ptr}(a, b) -> (res : felt):
    let (le) = is_le(a, b)
    return (1 - le)
end

func is_lt{range_check_ptr}(a, b) -> (res : felt):
    return is_gt(b, a)
end

func is_lte{range_check_ptr}(a, b) -> (res : felt):
    return is_le(a, b)
end

func is_gte{range_check_ptr}(a, b) -> (res : felt):
    return is_lte(b, a)
end

# Uint256 comparison functions

func uint256_gt{range_check_ptr}(a : Uint256, b : Uint256) -> (res : felt):
    let (le) = uint256_le(a, b)
    return (1 - le)
end

func uint256_gte{range_check_ptr}(a : Uint256, b : Uint256) -> (res : felt):
    alloc_locals

    let (gt) = uint256_gt(a, b)
    let (eq) = uint256_eq(a, b)

    if gt == TRUE:
        return (TRUE)
    end

    if eq == TRUE:
        return (TRUE)
    end

    return (FALSE)
end

func uint256_lt{range_check_ptr}(a : Uint256, b : Uint256) -> (res : felt):
    return uint256_gt(b, a)
end
