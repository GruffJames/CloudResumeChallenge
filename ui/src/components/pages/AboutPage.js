

function AboutPage(){
    return (
        <div id="tab-about" className='tab-content__item'>
            <div className="row tab-content__item-header">
                <div className="column">
                    <h1>Hello.
                    My name is Gruff James and I'm a software developer from Northumberland, based in Glasgow Scotland.</h1>
                </div>
            </div>

            <div className="row">
                <div className="column">
                    <p className="lead">
                        This website was created as part of the 
                        Cloud resume challenge. 
                    </p>
                    <p> 
                        It's hosted on AWS, with the configuration 
                        defined using Terraform. 

                        The front end was developed using Javascript React, with the backend
                        using Node.js Lambdas that connect to DynamoDb tables.

                        A GitHub Action pipeline is used to build all this and launch it 
                        onto a S3 to act as a static website. This is then only triggered after any changes have been pushed to GIT.

                    </p>

                    <p>The code can found on github.
                        <br/>
                        <cite>
                            <a href="https://github.com/GruffJames/CloudResumeChallenge/">https://github.com/GruffJames/CloudResumeChallenge/</a>
                        </cite>
                    </p>
                </div>
            </div>
            
        </div> 
    );
}

export default AboutPage;