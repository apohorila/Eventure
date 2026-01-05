import React from "react"
import {Link} from "react-router-dom"
import "./Home.css"

export default function Home(){
    return (
        <div className="create-account-container">
            <div className="create-account-text">
                <h1>Ваші інтереси <br />
                    Ваша компанія
                </h1>
                <p>Eventure - це платформа для пошуку однодумців. Ми допомагаємо вам перетворити ваші інтереси  на реальні події. Організовуйте власні зустрічі або знаходьте ідеальний івент поруч із вами — від гри в баскетбол до спільного походу в кіно.</p>
                <Link to="/create" className="button-link">Створити акаунт</Link>
            </div>
            <div className="home-page-img">
                <img src="https://placehold.co/585x540" />
            </div>
        </div>
    )
}