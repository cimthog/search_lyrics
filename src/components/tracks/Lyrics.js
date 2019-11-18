import React, { Component } from 'react'
import axios from 'axios'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

class Lyrics extends Component {

    state = {
        track: {},
        lyrics: {}
    }

    async componentDidMount() {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        const lyrics = await response.data.message.body.lyrics.lyrics_body
        this.setState({lyrics: lyrics})

        const track_response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        const track_details = await track_response.data.message.body.track
        this.setState({track: track_details})
    }

    render() {
        const { track, lyrics } = this.state
        if (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
            return <Spinner />
        } else {
            return (
                <React.Fragment>
                  <Link to='/' className='btn btn-dark btn-sm mb-4'>Go Back</Link>
                    <div className='card'>
                        <h5 className='card-header'>
                            {track.track_name} by {' '}
            <span className='text-secondary'>{track.artist_name}</span>
                        </h5>

                        <div className='card-body'>
            <p className='card-text'>{lyrics.split("\n").map(lyric => {
                return <p className="card-text">{lyric}</p>
              })}</p>
                        </div>
                    </div>

                    <ul className='list-group mt-3'>
                        <li className='list-group-item'>
                            <strong>Album ID</strong>: {track.album_id}
                        </li>
                        <li className="list-group-item">
                        <strong>Song Genre</strong>:{' '}
                        {track.primary_genres.music_genre_list.length !== 0
                            ? track.primary_genres.music_genre_list[0].music_genre
                                .music_genre_name
                            : 'N/A'}
                        </li>

                        <li className='list-group-item'> 
                            <strong>Explicit Words</strong>: {track.explicit === 0? 'No' : "Yes"}
                        </li>
                        <li className='list-group-item'> 
                           <strong>Release Date</strong>: <Moment format='DD/MM/YY'>{track.first_release_date}</Moment> 
                        </li>
                    </ul>
                </React.Fragment>
            )
        }
    
    }
}
export default Lyrics