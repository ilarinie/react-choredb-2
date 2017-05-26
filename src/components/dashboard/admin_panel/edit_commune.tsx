import * as React from 'react';
import {RaisedButton, TextField, Paper, Card, CardHeader, CardText} from "material-ui";
import {ApiService} from "../../../services/api_service";
import {Commune} from "../../../models/commune";
import {updateMessage} from "../notificator/notificator";
import {fetchCommune} from "../../../store/state_observable";


export class EditCommune extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            commune: this.props.commune
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let commune: Commune = this.state.commune;

        let name = (document.getElementById('commune-name-input') as HTMLInputElement).value;
        let telegram_channel_id = (document.getElementById('commune-channel-id-input') as HTMLInputElement).value;

        commune.name = name;
        commune.telegram_channel_id = telegram_channel_id;
        ApiService.updateCommune(commune).then((success) => {
            updateMessage('Commune updated successfully');
            fetchCommune();
        }).catch((error) => {
           updateMessage(error.message);
        });

    }


    render() {
        return (
            <div className="form-component-container">
                <h2>Edit commune details</h2>
                    <form onSubmit={this.handleSubmit}>
                        <Paper zDepth={2}>
                            <TextField
                                id="commune-name-input"
                                className="small-form-input"
                                defaultValue={this.state.commune.name}
                                underlineShow={false}
                                floatingLabelText="Commune name"
                            />
                            <TextField
                                id="commune-channel-id-input"
                                className="small-form-input"
                                defaultValue={this.state.commune.telegram_channel_id}
                                underlineShow={false}
                                floatingLabelText="Telegram channel id"
                            />
                        </Paper><br />
                        <RaisedButton
                            type="submit"
                            label="Update"
                        />
                    </form>
                    <br />
                    <Card>
                        <CardHeader
                            title="Telegram channel id? What does that mean?"
                            showExpandableButton={true}
                            actAsExpander={true}
                        />
                        <CardText expandable={true}>
                            Telegram is a free IM client for desktop and mobile, see: <a href="https://telegram.org/" target="_blank">Telegram homepage</a>
                            <p>
                                ChoreDB can be configured to send informative messages to your Telegram channel.
                                These messages include notifications ofnew purchases, completion of chores, new chores and mode.
                                To enable this functionality, the following is required:
                                <ol>
                                    <li>Your own Telegram channel for your commune</li>
                                    <li>Either set an id for the channel e.g. "@channel_name" of find out the numeric default id</li>
                                    <li>Set the channel id to the commune using the form above</li>
                                    <li>Invite a bot called @KommuBot to the channel</li>
                                    <li>That's it, you can now receive notifications straight to Telegram</li>
                                </ol>
                                <p>
                                    In the future, more Telegram functionality may be added.
                                </p>
                            </p>
                        </CardText>
                    </Card>
            </div>
        )
    }



}