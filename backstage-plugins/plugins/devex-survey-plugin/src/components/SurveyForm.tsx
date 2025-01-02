import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useMemo } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  progressContainer: {
    marginBottom: theme.spacing(4),
  },
  formContainer: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(0, 2),
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.background.default,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.divider,
    },
  },
  progressLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  questionBox: {
    marginBottom: theme.spacing(4),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

export type QuestionOption = {
  value: string;
  label: string;
};

export type BaseQuestion = {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
};

export type RadioQuestion = BaseQuestion & {
  type: 'radio';
  options: QuestionOption[];
};

export type TextQuestion = BaseQuestion & {
  type: 'text';
  multiline?: boolean;
  rows?: number;
};

export type CheckboxQuestion = BaseQuestion & {
  type: 'checkbox';
};

export type Question = RadioQuestion | TextQuestion | CheckboxQuestion;

export type Survey = {
  questions: Question[];
};

export type SurveyFormData = Record<string, string | boolean>;

type SurveyFormProps = {
  survey: Survey;
  formData: SurveyFormData;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
};

const QuestionField = ({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string | boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const classes = useStyles();

  const renderDescription = () => {
    if (!question.description) return null;
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ marginBottom: '8px', marginTop: '8px' }}
      >
        {question.description}
      </Typography>
    );
  };

  switch (question.type) {
    case 'radio':
      return (
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">{question.title}</FormLabel>
          {renderDescription()}
          <RadioGroup
            name={question.id}
            value={value as string}
            onChange={onChange}
          >
            {question.options.map(option => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case 'text':
      return (
        <FormControl className={classes.formControl}>
          <TextField
            name={question.id}
            label={question.title}
            helperText={question.description}
            multiline={question.multiline}
            rows={question.rows}
            variant="outlined"
            value={value as string}
            onChange={onChange}
            required={question.required}
          />
        </FormControl>
      );

    case 'checkbox':
      return (
        <FormControl className={classes.formControl}>
          {renderDescription()}
          <FormControlLabel
            control={
              <Checkbox
                checked={value as boolean}
                onChange={onChange}
                name={question.id}
                required={question.required}
              />
            }
            label={question.title}
          />
        </FormControl>
      );

    default:
      return null;
  }
};

export const SurveyForm = ({
  survey,
  formData,
  onChange,
  onSubmit,
}: SurveyFormProps) => {
  const classes = useStyles();

  const { totalRequired, answeredRequired, progress } = useMemo(() => {
    const requiredQuestions = survey.questions.filter(q => q.required);
    const totalRequired = requiredQuestions.length;
    const answeredRequired = requiredQuestions.filter(question => {
      const value = formData[question.id];
      return value !== undefined && value !== '';
    }).length;
    const progress = (answeredRequired / totalRequired) * 100;

    return { totalRequired, answeredRequired, progress };
  }, [survey.questions, formData]);

  const isFormValid = useMemo(() => {
    return survey.questions.every(question => {
      if (!question.required) return true;
      const value = formData[question.id];
      return value !== undefined && value !== '';
    });
  }, [survey.questions, formData]);

  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <Box className={classes.progressContainer}>
        <Box className={classes.progressLabel}>
          <Typography variant="body2" color="textSecondary">
            Progress
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {answeredRequired} of {totalRequired} questions answered
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={isFormValid ? 'primary' : 'secondary'}
        />
      </Box>

      <Box className={classes.formContainer}>
        {survey.questions.map(question => (
          <Box key={question.id} className={classes.questionBox}>
            <QuestionField
              question={question}
              value={formData[question.id]}
              onChange={onChange}
            />
          </Box>
        ))}
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
        disabled={!isFormValid}
      >
        Submit Survey
      </Button>
    </form>
  );
};
