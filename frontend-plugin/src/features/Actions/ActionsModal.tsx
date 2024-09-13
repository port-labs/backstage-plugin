import { LinkButton } from "@backstage/core-components";
import { alertApiRef, configApiRef, useApi } from "@backstage/core-plugin-api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField,
} from "@material-ui/core";
import React, { useMemo } from "react";
import { executeAction } from "../../api/action";
import { UserInputs } from "../../api/types";
import { useServiceName } from "../../hooks/useServiceName";

export function ActionsModal({
  user_input,
  id,
  title,
  description,
}: {
  user_input: UserInputs | undefined;
  id: string;
  title: string;
  description: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const serviceName = useServiceName();

  const alertApi = useApi(alertApiRef);
  const config = useApi(configApiRef);
  const backendUrl = useMemo(
    () => config.getString("backend.baseUrl"),
    [config]
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const isRequired = (fieldId: string) => {
    return user_input?.required?.includes(fieldId);
  };

  return (
    <>
      <LinkButton variant="contained" color="primary" onClick={handleClickOpen}>
        Execute
      </LinkButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            setLoading(true);
            const formData = new FormData(event.target as HTMLFormElement);
            const formJson = Object.fromEntries((formData as any).entries());
            executeAction(backendUrl, id, serviceName ?? "", formJson).then(
              (response) => {
                setLoading(false);
                if (response.ok) {
                  alertApi.post({
                    message: "Action sent to queue successfully",
                    severity: "success",
                  });
                  handleClose();
                } else {
                  alertApi.post({
                    message: "Failed to execute action",
                    severity: "error",
                  });
                }
              }
            );
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        {loading && <LinearProgress />}
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          {Object.entries(user_input?.properties ?? {}).map(
            ([fieldId, value]) => (
              <TextField
                required={isRequired(fieldId)}
                margin="dense"
                id={fieldId}
                name={fieldId}
                type={value.type}
                fullWidth
                variant="standard"
                label={value.title}
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Execute
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
