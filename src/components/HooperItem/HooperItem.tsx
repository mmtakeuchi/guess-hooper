import React from 'react';
import { IHooperItemProps } from '../../types';
import {
  fullName,
  findTeam,
  calculateAge,
  getTeamLogo,
  compareHoopers,
  compareNumbers,
  compareHeights,
  compareTeams,
  comparePos,
} from '../../utils';
import './HooperItem.scss';

const HooperItem = ({ hooper, secretHooper }: IHooperItemProps) => {
  return (
    <tr className="hooper-item">
      <td>
        <div
          className={`hooper-item-name${
            hooper.firstName === secretHooper?.firstName &&
            hooper.lastName === secretHooper?.lastName
              ? ' correct'
              : ''
          }`}
        >
          {fullName(hooper.firstName, hooper.lastName)}
        </div>
      </td>
      <td>
        <div
          className={`hooper-item-team-logo${compareTeams(
            hooper.teamId,
            secretHooper?.teamId,
            secretHooper?.teams
          )}`}
        >
          <img src={getTeamLogo(hooper.teamId)} alt="team logo" />
          <span>{findTeam(hooper.teamId)?.abbreviation}</span>
        </div>
      </td>
      <td>
        <div
          className={`hooper-item-conference${compareHoopers(
            findTeam(hooper.teamId)?.conference,
            findTeam(secretHooper?.teamId)?.conference
          )}`}
        >
          {findTeam(hooper.teamId)?.conference}
        </div>
      </td>
      <td>
        <div
          className={`hooper-item-division${compareHoopers(
            findTeam(hooper.teamId)?.division,
            findTeam(secretHooper?.teamId)?.division
          )}`}
        >
          {findTeam(hooper.teamId)?.division}
        </div>
      </td>
      <td>
        <div
          className={`hooper-item-pos${comparePos(
            hooper.pos,
            secretHooper?.pos
          )}`}
        >
          {hooper.pos}
        </div>
      </td>
      <td>
        <div
          className={`hooper-item-height${compareHeights(
            [hooper.heightFeet, hooper.heightInches],
            [secretHooper?.heightFeet, secretHooper?.heightInches]
          )}`}
        >{`${hooper.heightFeet}' ${hooper.heightInches}"`}</div>
      </td>
      <td>
        <div
          className={`hooper-item-age${compareNumbers(
            calculateAge(hooper?.dateOfBirthUTC)?.toString(),
            calculateAge(secretHooper?.dateOfBirthUTC)?.toString()
          )}`}
        >
          {calculateAge(hooper.dateOfBirthUTC)}
        </div>
      </td>
      <td>
        <div
          className={`hooper-item-jersey${compareNumbers(
            hooper.jersey,
            secretHooper?.jersey
          )}`}
        >
          {hooper.jersey}
        </div>
      </td>
    </tr>
  );
};

export default HooperItem;
