import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { getPrediction } from '../actions/predictionAction'
import { TextField } from '@material-ui/core';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    addressInput: {
        color: "white",
        borderColor: "white",
        width: "600px"
    },
    safe_card: {
        minWidth: 275,
        backgroundColor: "#44bd44",
        color: "white",
        fontWeight: 900,
        padding: -9
      },
      unsafe_card: {
        minWidth: 275,
        backgroundColor: "#bd4444",
        color: "white",
        fontWeight: 900,
        padding: -9
      },
      loading_card: {
        minWidth: 275,
        backgroundColor: "#0a0802",
        color: "white",
        fontWeight: 900,
        padding: -9
      },
      status: {
        fontWeight: 900
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
        fontWeight: 900
      },
      pos: {
        color: "white"
      },

  });

class Predictor extends Component {
    
    constructor() {
        super();
        this.state =  {
            dateAndTime: "2018-05-24T10:30",
            address: "",
            mapAddress: "San Francisco"
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({
            mapAddress: this.state.address
        })
        this.props.getPrediction(this.state.dateAndTime, this.state.address);
    }
    render() {
        const { classes } = this.props;
        const safe = (<Card className={classes.safe_card}>
                        <CardContent>
                            <Typography className={classes.status} variant="h5" component="h2">
                            ✔️ Safe
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            You'll be fine, go ahead
                            </Typography>
                        </CardContent>
                    </Card>);
        
        const unsafe = (<Card className={classes.unsafe_card}>
            <CardContent>
                <Typography className={classes.status} variant="h5" component="h2">
                ⚠️ Unsafe
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                I'd stay home if I was you
                </Typography>
            </CardContent>
        </Card>);

        const loading = (<Card className={classes.loading_card}>
            <CardContent>
                <img width="275" src="https://media3.giphy.com/media/l2YWh7wOftaDgtqP6/giphy.gif?cid=790b76117058a637c0795b04397cc30e9a0926f05ce60c5e&rid=giphy.gif"/>
            </CardContent>
        </Card>);

        return(
            <header className="App-header">
                <h1>SF Crime Prediction 🔮</h1>
                {this.props.prediction.loading ? loading : null}
                {this.props.prediction.isSafe ? (
                    this.props.prediction.isSafe=="True" ? unsafe : safe
                ) : null}
                {/* {loading}
                {unsafe}
                {safe} */}
                
                <TextField
                    className={classes.addressInput}
                    id="standard-search"
                    label="Address or Point of Interest"
                    type="search"
                    value={this.state.address}
                    name="address"
                    onChange={this.onChange}
                    margin="normal"
                    fullWidth    
                />
                <TextField
                    id="datetime-local"
                    label="Time + Date"
                    name="dateAndTime"
                    value={this.state.dateAndTime}
                    onChange={this.onChange}
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <br/>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmit}>
                    Predict!
                </Button>
                <br/>
                <iframe 
                    width="600" 
                    height="450" 
                    frameborder="0" 
                    src={`https://www.google.com/maps/embed/v1/search?q=${encodeURI(this.state.mapAddress)}&key=${process.env.REACT_APP_SFCRIME_API_KEY}`}
                    allowfullscreen
                ></iframe>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    prediction: state.prediction
  });

  export default withStyles(styles)(
    connect(
        mapStateToProps,
        { getPrediction }
    )(withRouter(Predictor)));