this.Garages = React.createClass({
  getInitialState: function() {
    return {
      garages: this.props.data
    };
  },

  getDefaultProps: function() {
    return { garages: [] };
  },

  updateCar: function(car, data) {
    index = this.state.garages.indexOf(car);
    garages = React.addons.update(this.state.garages, { $splice: [[index, 1, data]] });
    this.replaceState({ garages: garages });
  },

  addCar: function(car) {
    garages = this.state.garages.slice();
    garages.push(car);
    this.setState({garages: garages});
  },

  deleteCar: function(car) {
    index = this.state.garages.indexOf(car);
    garages = React.addons.update(this.state.garages, { $splice: [[index, 1]] });
    this.replaceState({ garages: garages });
  },

  render: function() {
    var el = this;
    var items = this.state.garages;

    return (
      <div className='garages'>
        <h2 className='name'>Garage</h2>
        <div className='row'></div>
        <GarageForm handleNewCar={this.addCar} />
        <hr></hr>
        <table className='table table-bordered'>
          <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {items.map(function(car, i) {
            return <Garage car={car} key={i} handleDeleteCar={el.deleteCar} handleEditCar={el.updateCar} />
          })}
          </tbody>
        </table>
      </div>
    )
  }

})


// =====// =====// =====// =====// =====// =====// =====// =====// =====// =====// =====// =====


this.GarageForm = React.createClass({
  getInitialState: function() {
    return { make: '', model: '', year: ''};
  },

  valid: function() {
    return this.state.make && this.state.model && this.state.year
  },

  handleChange: function(e) {
    var change = {};
    var targetName = e.target.name;
    change[targetName] = e.target.value;
    this.setState(change);
  },

  handleSubmit: function(e) {

    var request = $.ajax({
      method: 'POST',
      url: "/garages",
      dataType: 'JSON',
      data: {garage: this.state}
    });

    // An arrow function expression lexically binds the 'this' value. Arrow fxns are anonymous
    request.done( (data) => {
      this.props.handleNewCar(data);
      this.setState(this.getInitialState());
    });

  },

  render: function() {
    var curState = this.state;
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Make' name='make'
            value={curState.make} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='text' className='form-control' placeholder='Car Type' name='model'
            value={curState.model} onChange={this.handleChange} />
        </div>
        <div className='form-group'>
          <input type='number' className='form-control' placeholder='Year' name='year'
            value={curState.year} onChange={this.handleChange} />
        <button type='submit' className='btn btn-primary' disabled={!this.valid()}>Add Car</button>
        </div>
      </form>
    )
  }
})


// ===== // =====// =====// =====// =====// =====// =====// =====// =====// =====


this.Garage = React.createClass({
  getInitialState: function() {
    return { edit: false }
  },

  handleToggle: function(e) {
    e.preventDefault();
    this.setState({edit: !this.state.edit })
  },

  handleDelete: function(e) {
    e.preventDefault();
    var request = $.ajax({
      method: 'DELETE',
      url: "/garages/" + this.props.car.id,
      dataType: 'JSON'
    });

    request.done( () => {
      this.props.handleDeleteCar(this.props.car)
    });

  },

  handleEdit: function(e) {
    e.preventDefault();
    var data = {
      make: ReactDOM.findDOMNode(this.refs.make).value,
      model: ReactDOM.findDOMNode(this.refs.model).value,
      year: ReactDOM.findDOMNode(this.refs.year).value
    }

    var request = $.ajax({
      method: "PUT",
      url: "/garages/" + this.props.car.id,
      dataType: "JSON",
      data: { garage: data }
    });

    request.done( (data) => {
      this.setState({ edit: false });
      this.props.handleEditCar(this.props.car, data);
    })
  },

  garageForm: function() {
    var propCar = this.props.car;

    return (
      <tr>
        <td>
          <input className="form-control" type="text" defaultValue={propCar.make} ref="make" />
        </td>
        <td>
          <input className="form-control" type="text" defaultValue={propCar.model} ref="model" />
        </td>
        <td>
          <input className="form-control" type="number" defaultValue={propCar.year} ref="year" />
        </td>
        <td>
          <a className="btn btn-default" onClick={this.handleEdit}>Update</a>
          <a className="btn btn-danger" onClick={this.handleToggle}>Cancel</a>
        </td>
      </tr>
    )
  },

  garageRow: function() {
    var propCar = this.props.car;

    return (
      <tr>
        <td> 
          <a href={"garages/" + propCar.id + "-" + propCar.make}>{propCar.make}</a>
        </td>
        <td> {propCar.model} </td>
        <td> {propCar.year} </td>
        <td>
          <a className="btn btn-default" onClick={this.handleToggle}>Edit</a>
          <a className="btn btn-danger" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    )
  },

  render: function() {
    if (this.state.edit) {
      return this.garageForm();
    } else {
      return this.garageRow();
    }
  }
})

