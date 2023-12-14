import './card.css';
function Card({children}){
    return (
  
         <div className="w3-modal customModal" style={{display:'block'}} >
            <div className="containerModal">
                <div className="w3-modal-content w3-card-4 customContent">
                    <div className="w3-container center-childs">
                        {children}
                    </div>
                </div>
            </div>
        </div>            

    );
}

export default Card;