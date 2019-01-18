import { Dialog, Classes } from "@blueprintjs/core";
import { Button, Intent } from "@blueprintjs/core";

export default ({ isOpen, onConfirm, onClose }) => (
  <Dialog isOpen={isOpen} onClose={onClose}>
    <div className={Classes.DIALOG_BODY}>
      Are you sure you want to delete this user?
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onClose}>Cancel</Button>
      </div>
    </div>
  </Dialog>
);
