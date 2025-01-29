
import dog_plug from '../../assets/images/custom/dog_plug.jpg'
function Error404Page() {
    return (
        <div id="tab-about" className='tab-content__item'>
            <div className="row tab-content__item-header">
                <div className="column">
                    <h1>Page not found</h1>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <img src={dog_plug} alt="a dog pulling the power plug"></img>
                </div>
            </div>
            
        </div> 
    );
}

export default Error404Page;