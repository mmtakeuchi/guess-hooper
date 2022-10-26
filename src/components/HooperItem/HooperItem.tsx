import React from 'react';
import { IHooperItemProps } from '../../types';
import { fullName, findTeam, calculateAge, getTeamLogo } from '../../utils';
import './HooperItem.scss';

const HooperItem = ({ hooper, secrectHooper }: IHooperItemProps) => {
  console.log(hooper);
  console.log(findTeam(hooper?.teamId));
  return (
    <tr className="hooper-item">
      <td className="hooper-item-name">
        {fullName(hooper.firstName, hooper.lastName)}
      </td>
      <td>
        <div className="hooper-item-team-logo">
          <img src={getTeamLogo(hooper.teamId)} alt="team logo" />
          <span>{findTeam(hooper.teamId)?.abbreviation}</span>
        </div>
      </td>
      <td>{findTeam(hooper.teamId)?.conference}</td>
      <td>{findTeam(hooper.teamId)?.division}</td>
      <td>{hooper.pos}</td>
      <td>{`${hooper.heightFeet}' ${hooper.heightInches}"`}</td>
      <td>{calculateAge(hooper.dateOfBirthUTC)}</td>
      <td>{hooper.jersey}</td>
    </tr>
  );
};

export default HooperItem;
