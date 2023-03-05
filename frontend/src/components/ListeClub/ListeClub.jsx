import './ListeClub.css'
import face1 from '../../assets/clubC2E.png'
import face2 from '../../assets/clubC3LF.jpg'
import face3 from '../../assets/clubCyberSecurt.jpg'
import face4 from '../../assets/clubMulti.jpg'

const data = [
    {image: `${face1}`},
    {image: `${face1}`},
    {image: `${face2}`},
    {image: `${face3}`},
    {image: `${face3}`},
    {image: `${face3}`},
]

export const ListClub = () => {
    return(
        <div className="ListESN">
            <div className="gradiant"></div>

            <div className="toutESN">
                <h2>Liste des Club</h2>
            </div>
            <hr />

            <div className="contentList">
                {
                    data.map((data,index)=>{
                        return(
                            <div key={index} className="img">
                                <div className="statut"></div>
                                <img src={data.image} alt="sublime" />
                            </div>
                        )
                    })
                }
                <div className='autre'>Autres ...</div>
            </div>
        </div>
    )
}