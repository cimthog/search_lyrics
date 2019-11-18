import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'

class Search extends Component {
    state = {
        trackTitle: ''
    }

    findTrack = async (dispatch,e) => {
        e.preventDefault()

        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        dispatch({
            type: 'SEARCH_TRACKS',
            payload: await response.data.message.body.track_list
        })

        this.setState({trackTitle: ''})
    }
    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <Consumer>
                {value => {
                    const { dispatch } = value
                    return (
                        <div className='card card-body mb-4 p-4'>
                            <h1 className='display-4 text-center'>
                                <i className='fas fa-music'></i> Search for a Song
                            </h1>
                            <p className='lead text-center'>Get the Lrics for any Song</p>
                            <form onSubmit={this.findTrack.bind(this, dispatch)}>
                                <div className='form-group'>
                                    <input type='text' className='form-control form-control-lg mb-2'
                                     placeholder='Song title....' name='trackTitle' value={this.state.trackTitle} onChange={this.onChange}/>
                                    <button className='btn btn-primary btn-lg btn-block mb-5'type='submit'>Get Track Lyrics</button>
                                </div>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search