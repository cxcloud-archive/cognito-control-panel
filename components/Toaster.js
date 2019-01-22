import { Position, Toaster } from "@blueprintjs/core";

export default process.browser &&
  Toaster.create({
    className: "recipe-toaster",
    position: Position.TOP
  });
