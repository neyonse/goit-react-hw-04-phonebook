import React from 'react';
import PropTypes from 'prop-types';
import css from './Section.module.css';

export const Section = ({ className, title, children }) => {
  return (
    <section className={css[className]}>
      <div className="container">
        <h2 className={css.sectionTitle}>{title}</h2>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
