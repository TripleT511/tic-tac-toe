import React from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

export default function Board({ children }) {
    return <div className={clsx(styles.Board)}>
        { children  }
  </div>;
}
