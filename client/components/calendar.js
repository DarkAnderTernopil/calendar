import React from 'react';
import { getDaysArrayByMonth } from '../utils/momentUtils';
import { connect } from 'react-redux';
import { changePopup, setCurrentShowMonth } from '../actions/calendarActions';
import { Select, Button, Icon } from 'antd';
import Reservation from './reservation';
import CalendarRow from './calendarRow';
import moment from 'moment';
const { Option } = Select;
function Calendar({ cars = [], changePopup, currentShowMonth, setCurrentShowMonth }) {
  const numberCurrentMonth = currentShowMonth || moment().format('M');
  const currentMonth = moment(numberCurrentMonth, 'MM').format('MMMM YYYY');
  const allDays = getDaysArrayByMonth(numberCurrentMonth).reverse();
  const dayRow = (car) => (
    <CalendarRow car={car} key={car._id} allDays={allDays} changePopup={changePopup} />
  );
  const handleMinus = () => setCurrentShowMonth(+numberCurrentMonth - 1);
  const handlePlus = () => setCurrentShowMonth(+numberCurrentMonth + 1);
  return (
    <div className={`calendar`}>
      <div className="calendar-top">
        <div className="calendar-today">
          <Button
            className={`calendar-button`}
            style={{
              background: '#FFFFFF',
              border: '1px solid #A3D2FC',
              borderRadius: '4px',
            }}
          >
            Today
          </Button>
        </div>
        <div className="calendar-month">
          <Icon type="left" fill={`#99ABB4`} onClick={handleMinus} />
          <div className="calendar-month__text">{currentMonth}</div>
          <Icon type="right" fill={`#99ABB4`} onClick={handlePlus} />
        </div>
        <div className="calendar-type-check">
          <Select
            showSearch
            className={'calendar-select'}
            style={{
              width: 137,
              height: 32,
              background: '#FFFFFF',
              /* None active grey */

              border: '1px solid #CED4DA',
              borderRadius: '4px',
            }}
            placeholder="Month"
            optionFilterProp="children"
            defaultValue={'Month'}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Month">Month</Option>
            <Option value="Day">Day</Option>
            <Option value="Year">Year</Option>
          </Select>
        </div>
      </div>
      <div className="calendar-row">
        {allDays.map((elem) => {
          return (
            <div className={'calendar-cel calendar-header'} key={elem.format('ddd/DD/MM/GGGG')}>
              <div
                data-fsdf={elem.format('ddd')}
                className={`calendar-text ${
                  elem.format('ddd') === 'Sat' || elem.format('ddd') === 'Sun'
                    ? 'calendar-weekend'
                    : ''
                }`}
              >
                <div className="calendar-day ">{elem.format('ddd')}</div>
                <div className="calendar-number">{elem.format('DD')}</div>
              </div>
            </div>
          );
        })}
      </div>
      {cars.map((elem) => dayRow(elem))}
    </div>
  );
}

export default connect(({ calendar }) => ({ currentShowMonth: calendar.currentShowMonth }), {
  changePopup,
  setCurrentShowMonth,
})(Calendar);
