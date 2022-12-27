import React, { Component } from 'react';

export default class Table extends Component {
  render() {
    return (
      <div>
          <h1>Hello</h1>
         <table>

<tr>
    <th>id</th>
    <th>impactType</th>
    <th>classType</th>
    <th>recth</th>
    <th>rectw</th>
    <th>rectx</th>
    <th>recty</th>

</tr>

{this.state.rectangle_list.map((val, key) => {
    return (
        <tr key={key}>
            <td>{val.id}</td>
            <td>{val.impactType}</td>
            <td>{val.classType}</td>
            <td>{val.recth}</td>
            <td>{val.rectw}</td>
            <td>{val.rectx}</td>
            <td>{val.recty}</td>
            <td><button onClick={() => { this.deleteRow(val.id) }}>Delete</button></td>
            <td><button onClick={() => { this.resizeBox(val.id) }}>Resize</button></td>
        </tr>
    )
})}
</table>
      </div>
    );
  }
}
