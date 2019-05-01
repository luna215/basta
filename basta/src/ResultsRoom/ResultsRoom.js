import React, { Component } from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class ResultsRoom extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            results: []
        }
    }

    componentDidMount() {
        this.setState({results: this.props.results}, () => {
            console.log(this.state.results);
        });
    }
    
    render() {
        return <div>
                <h1>Results</h1>
                <Table >
                    <TableHead>
                    <TableRow>
                        <TableCell>Player</TableCell>
                        <TableCell align="right">Nombre</TableCell>
                        <TableCell align="right">Apellido</TableCell>
                        <TableCell align="right">Ciudad</TableCell>
                        <TableCell align="right">Fruta</TableCell>
                        <TableCell align="right">Cosa</TableCell>
                        <TableCell align="right">Animal</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.results.map((row) => (

                        <TableRow>
                        <TableCell component="th" scope="row">
                          {row.playername}
                        </TableCell>
                        <TableCell align="right">{row.nombre}</TableCell>
                        <TableCell align="right">{row.apellido}</TableCell>
                        <TableCell align="right">{row.ciudad}</TableCell>
                        <TableCell align="right">{row.fruta}</TableCell>
                        <TableCell align="right">{row.cosa}</TableCell>
                        <TableCell align="right">{row.animal}</TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
    }
}