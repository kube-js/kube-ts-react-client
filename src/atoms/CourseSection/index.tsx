// tslint:disable:no-magic-numbers
import { List, ListItem, ListItemText } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import React from 'react';
import Section from '../../types/items/Section';

const ExpansionPanel = withStyles({
  root: {
    '&$expanded': {
      margin: 'auto',
    },
    '&:before': {
      display: 'none',
    },
    '&:not(:last-child)': {
      margin: '12px 0',
    },
    border: '1px solid rgba(0, 0, 0, .125)',
    expanded: {},
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  content: {
    margin: '12px 0',
  },
  expanded: {},
  root: {
    '&$expanded': {
      minHeight: 56,
    },
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    display: 'flex',
    minHeight: 56,
  },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}))(MuiExpansionPanelDetails);

export interface Unit {
  readonly title: string;
}

interface Options {
  readonly section: Section;
  readonly expandedIds: string[];
  readonly onChange: (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => void;
}

const CourseSection = ({ section, expandedIds, onChange }: Options) => {
  const expanded = expandedIds.includes(section.id);

  return (
    <ExpansionPanel
      square
      elevation={0}
      expanded={expanded}
      onChange={onChange}
    >
      <ExpansionPanelSummary
        aria-controls={`panel-${section.id}-content`}
        id={`panel-header-${section.id}`}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        <Typography style={{marginLeft: '10px'}}>{section.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List
          component="nav"
          /** TODO: move to classes */
          style={{
            backgroundColor: '#fff',
            width: '100%',
          }}
          aria-label="course section"
        >
          {section.units.map((unit: Unit, index: number) => (
            <ListItem key={index} divider={section.units.length - 1 !== index}>
              <>
                <PlayCircleOutlineIcon style={{ marginRight: '1rem' }} />
                <ListItemText primary={unit.title}></ListItemText>
              </>
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

// tslint:disable-next-line:max-file-line-count
export default CourseSection;
