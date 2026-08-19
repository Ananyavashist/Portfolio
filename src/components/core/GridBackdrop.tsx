/**
 * Graph-paper backdrop for light sections. Sizing and line colour come from
 * `--grid-square` and `--grid-line` in tokens.css so both sections stay in step.
 *
 * Mount it as the first child of a `relative` section: it carries no z-index, so
 * paint order alone keeps it behind every sibling that follows.
 */
export function GridBackdrop() {
  return (
    <div
      aria-hidden
      data-ui="GridBackdrop"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--grid-line) 0 1px, transparent 1px 100%), linear-gradient(to bottom, var(--grid-line) 0 1px, transparent 1px 100%)",
        backgroundSize: "var(--grid-square) var(--grid-square)",
      }}
    />
  );
}
