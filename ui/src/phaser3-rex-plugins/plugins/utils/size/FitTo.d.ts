export default FitTo;

declare namespace FitTo {
    type SizeType = { width: number, height: number };
}

declare function FitTo(
    child: FitTo.SizeType,
    parent: FitTo.SizeType,
    out?: FitTo.SizeType | true
): FitTo.SizeType;
