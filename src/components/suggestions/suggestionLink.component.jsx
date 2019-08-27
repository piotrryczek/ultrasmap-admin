import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CreateIcon from '@material-ui/icons/Create';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import { formatDate } from 'util/helpers';

const useStyles = makeStyles(theme => ({
  listItemIcon: {
    minWidth: '36px',
  },
}));

function SuggestionLink(props) {
  const {
    isChecked,
    onSelect,
    onDeselect,
    isCurrent,
    onCurrentChange,
    suggestion: {
      _id: id,
      type,
      createdAt,
      original,
      data,
      user,
    }
  } = props;

  const classes = useStyles({});

  const handleChange = useCallback((event) => {
    event.stopPropagation();
    
    if (isChecked) {
      onDeselect(id)
    } else {
      onSelect(id);
    }
  }, [isChecked, id, onDeselect, onSelect]);

  const name = type === 'new' ? data.name : original.name;

  const handleCurrentSuggestionChange = useCallback(() => {
    onCurrentChange(id);
  }, []);

  // eslint-disable-next-line react/jsx-one-expression-per-line
  const suggestionName = (<>For: <strong>{name}</strong> by: <strong>{user.email}</strong> ({formatDate(createdAt)})</>);

  return (
    <Box display="flex">
      <Checkbox
        checked={isChecked}
        onChange={handleChange}
      />
      <ListItem button onClick={handleCurrentSuggestionChange} selected={isCurrent}>
        <ListItemIcon className={classes.listItemIcon}>
          {type === 'new'
            ? (<LibraryAddIcon />)
            : (<CreateIcon />)}
        </ListItemIcon>
        <ListItemText primary={suggestionName} />
      </ListItem>
    </Box>
  );
}

export default SuggestionLink;

