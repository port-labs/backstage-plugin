import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React from 'react';

interface TextModalProps {
  open: boolean;
  title: string;
  defaultValue?: string;
  onClose: () => void;
  onSave: (text: string) => Promise<void>;
}

export const TextModal: React.FC<TextModalProps> = ({
  open,
  title,
  defaultValue = '',
  onClose,
  onSave,
}) => {
  const [text, setText] = React.useState(defaultValue);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSave = () => {
    setIsLoading(true);
    onSave(text).then(() => {
      setIsLoading(false);
      setText('');
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setText('');
        onClose();
      }}
      aria-labelledby="text-modal-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="text-modal-title">{title}</DialogTitle>
      <DialogContent>
        <TextField
          disabled={isLoading}
          autoFocus
          multiline
          fullWidth
          minRows={25}
          value={text}
          onChange={e => setText(e.target.value)}
          variant="outlined"
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setText('');
            onClose();
          }}
          color="primary"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
