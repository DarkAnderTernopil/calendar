import React, { Component, useEffect } from 'react';
import { Input, Tooltip, Icon, Row, Col, DatePicker, Button, Select } from 'antd';
import { connect } from 'react-redux';
import { addReservation, changePopup } from '../actions/calendarActions';
const { Option } = Select;
import moment from 'moment';
import reservationConfig from '../config/reservationConfig';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
class PopupForAddReservation extends Component {
  constructor(props) {
    super(props);
    let { checkDay = {} } = this.props;
    this.state = {
      color: '#30BE71',
      status: 'Reserved',
      rangeDate: [],
      start: checkDay.start,
      end: checkDay.start,
      vehicle: checkDay.nameCar,
      carId: checkDay.carId,
    };
  }

  onChange2 = (value) => {
    this.setState({ color: reservationConfig.colors[value], status: value });
  };

  changeDataPiker = (date) => {
    const start = date[0].format('X');
    const end = date[1].format('X');
    this.setState({
      start,
      end,
    });
  };

  changeInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    let { changePopup, checkDay = {}, addReservation } = this.props;

    return (
      <div className={`popup-for-add-reservation`}>
        <div className="popup-for-add-reservation-exit" onClick={() => changePopup(false)}>
          <Icon type="close" />
        </div>
        <Row gutter={13} style={{ marginBottom: '13px' }}>
          <Col span={12}>
            <Input
              placeholder="Vehicle"
              onChange={({ target }) => this.changeInput('vehicle', target.value)}
              defaultValue={checkDay.nameCar}
              suffix={<Icon type="car" />}
            />
          </Col>
          <Col span={12}>
            <Input
              onChange={({ target }) => this.changeInput('customer', target.value)}
              placeholder="Customer"
              suffix={<Icon type="user" />}
            />
          </Col>
        </Row>
        <Row gutter={13} style={{ marginBottom: '13px' }}>
          <Col span={8}>
            <Select
              showSearch
              style={{ width: '100%', color: this.state.color }}
              placeholder="Status"
              defaultValue={'Reserved'}
              optionFilterProp="children"
              onChange={this.onChange2}
              suffix={<Icon type="car" />}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Reserved" style={{ color: '#30BE71' }}>
                Reserved
              </Option>
              <Option value="Maintenance" style={{ color: '#99ABB4' }}>
                Maintenance
              </Option>
              <Option value="Requested" style={{ color: '#E89821' }}>
                Requested
              </Option>
            </Select>
          </Col>
          <Col span={16}>
            <RangePicker
              defaultValue={[
                moment.unix(checkDay.start).utc(dateFormat),
                moment.unix(checkDay.start).utc(dateFormat),
              ]}
              onChange={this.changeDataPiker}
            />
          </Col>
        </Row>
        <Button type="primary" onClick={() => addReservation({ ...this.state }, checkDay.carId)}>
          Save
        </Button>
      </div>
    );
  }
}

export default connect(({ calendar }) => ({ checkDay: calendar.checkDay }), {
  changePopup,
  addReservation,
})(PopupForAddReservation);
