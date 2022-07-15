import React from 'react';
import classes from './index.module.scss';

const TabButton = ({
  handleTab,
  word,
  count,
  selected
}: {
  handleTab: (selectedTab: string) => void;
  word: string;
  count: number;
  selected?: boolean;
}) => {
  return (
    <button
      disabled={count === 0}
      className={`${classes.TabButton} ${selected ? classes['TabButton--Selected'] : ''}`}
      onClick={handleTab.bind(null, word)}>
      {word}
      <span className={classes.TabButton__Count}>{count}</span>
    </button>
  );
};

export default TabButton;
