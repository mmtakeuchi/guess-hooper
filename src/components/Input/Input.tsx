import React, { useState } from 'react';
import './Input.scss';

interface Props {}

const Input = (props: Props) => {
  const [search, setSearch] = useState('');

  return (
    <input
      type="text"
      placeholder="Guess the hooper"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default Input;
