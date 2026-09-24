# Concacaf formation — Singular.live widget

## Install
1. In Singular Dashboard, open User Menu → Widget Manager → New Widget. Your account needs developer permissions.
2. Name the widget “Concacaf Formation”. Copy the complete contents of `ui-definition.json` into its UI Definition field and save.
3. Copy `deploykey.example.json` to `deploykey.json` in this folder and replace its placeholder with the widget's Deploy Key. Keep that file private.
4. From this folder, run `npx --yes singular-cli deploywidget .` (requires Node.js and network access).
5. In Composer's Widget Browser enable **Show Dev Versions**, add the widget and test the controls. A starting size of 894 × 840 preserves the preview aspect ratio; the graphic scales to fit the widget box.
6. After checking it in Composer, publish the widget from Widget Manager when ready.

## Controls
- Formation: text such as `4-2-3-1`, `4-3-3`, `3-5-2` or `4-2-4`. Use 2–5 rows of 1–5 players totaling 10. Goalkeeper is automatic. Valid edits take effect immediately; invalid or incomplete input retains the last valid layout.
- Horizontal gap: one shared gap, 0–160 reference pixels. Wide layouts scale down to stay inside the widget.
- Player 1 is always the goalkeeper. Players 2–11 fill defence through attack, left to right per row. Player identities remain in the same slots when the formation changes.
- Names and shirt numbers are text fields; numbers may retain leading zeros.

The transparent output includes the formation label and player cards only. Row curvature is automatic, and positional changes animate for 750 ms. The supplied shirt image is embedded. Font substitutes match the HTML prototype; exact reference fonts have not been supplied. Standard Composer animations can control the overall widget; no custom timeline animation is registered.

## Files
- `source/output.html`: production renderer and Singular SDK callbacks.
- `source/icon.png`: supplied shirt icon.
- `ui-definition.json`: 24 control fields, grouped by layout and player.
- `preview.html`: local SDK-callback simulator; not deployed.
- `verify.cjs`: callback and validation checks; run `node verify.cjs`.

Only the `source` folder is uploaded by the CLI. No deployment key is included. This package has been tested locally, but must still be verified inside your Singular account.

Documentation: https://developer.singular.live/software-development-kits/widget-sdk/getting-started
