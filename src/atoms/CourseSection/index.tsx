// tslint:disable:no-magic-numbers
import { List, ListItem, ListItemText } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
      borderBottom: 0,
    },
    border: '1px solid rgba(0, 0, 0, .125)',
    expanded: {},
  },
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
  root: {
    '&$expanded': {
      minHeight: 56,
    },
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
  },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
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

const CourseSection = ({ section, expandedIds, onChange }: Options) => (
  <ExpansionPanel
    square
    expanded={expandedIds.includes(section.id)}
    onChange={onChange}
  >
    <ExpansionPanelSummary
      aria-controls={`panel-${section.id}-content`}
      id={`panel-header-${section.id}`}
    >
      <Typography>{section.title}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <List
        component="nav"
        /** TODO: move to classes */
        style={{
          backgroundColor: '#fff',
          width: '100%',
        }}
        aria-label="mailbox folders"
      >
        {section.units.map((unit: Unit, index: number) => (
          <ListItem key={index} divider={section.units.length - 1 !== index}>
            <>
              <PlayCircleOutlineIcon style={{marginRight: '1rem'}} />
              <ListItemText primary={unit.title}></ListItemText>
            </>
          </ListItem>
        ))}
      </List>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

// tslint:disable-next-line:max-file-line-count
export default CourseSection;
