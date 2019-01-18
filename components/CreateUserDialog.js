import { Dialog, Classes } from "@blueprintjs/core";

export default ({ isOpen, onClose }) => (
  <Dialog isOpen={isOpen} title='Create New User' onClose={onClose}>
    <div className={Classes.DIALOG_BODY}>bla bla and bla</div>
  </Dialog>
);
