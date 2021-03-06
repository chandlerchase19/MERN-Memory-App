import React, { useEffect, Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGames } from '../../../actions/profile'
import moment from 'moment'
import Loading from '../../Loading'
import HistoryNav from './HistoryNav'

const UserHistory = ({ profile, getGames }) => {
    useEffect(() => {
        getGames(localStorage.getItem('auth-id'))
    }, [])

    let showHistoryNav = false
    let showNoGamesAlert = false

    if (!profile.loading) {
        if (profile.allGames.length > 0) {
            showHistoryNav = true
        } else {
            showNoGamesAlert = true
        }
    }

    return (
        <div id='game-history-wrapper'>
            <h1>Saved History</h1>

                {showHistoryNav && <HistoryNav />}
                {profile.loading && <Loading />}
                    
                <div id='game-history'>
                    {profile.allGames && profile.allGames.map(game => (
                        <div className="game-history-item">
                            <p>{game.title}</p>
                            <p>{moment(game.date).format('MM/DD/YYYY')}</p>
                            <p>{game.score}</p>
                        </div>
                    ))}
                </div>

                {showNoGamesAlert &&
                    <div>
                        <p id='no-games'>No games played. Choose a game and save your score.</p>
                        <Link to='/games' className='play-btn'>Play</Link>
                    </div>
                }
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getGames })(UserHistory)