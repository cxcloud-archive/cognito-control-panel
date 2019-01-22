import { Dialog, Classes } from "@blueprintjs/core";
import { Button, Intent } from "@blueprintjs/core";
import Router from "next/router";
import AppToaster from "../components/Toaster";

export default class extends React.Component {
  onConfirm = () => {
    return this.props
      .onConfirm()
      .then(() => Router.push(`/`))
      .then(res =>
        AppToaster.show({
          message: "User was successfully deleted",
          intent: Intent.SUCCESS
        })
      )
      .catch(error =>
        AppToaster.show({
          message: "Something went wrong, please try again",
          intent: Intent.DANGER
        })
      );
  };
  onClose = () => this.props.onClose();

  render() {
    return (
      <Dialog isOpen={this.props.isOpen} onClose={this.onClose}>
        <div className={Classes.DIALOG_BODY}>
          Are you sure you want to delete this user?
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={this.onConfirm}>Confirm</Button>
            <Button onClick={this.onClose}>Cancel</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
