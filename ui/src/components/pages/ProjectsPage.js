

function ProjectsPage(){
    return (
        <div id="LargeProjects">
            <h1>Projects completed </h1>
            <div id="Alles gurgelt">
                <h5>Alles gurgelt / Everything gurgles</h5>
                <p>
                    Worked as part of a team to create the "Alles gurgelt”/”Everything gurgles” COVID platform for Vienna 
                    in Austria. The project created a platform to give people in the region access to weekly COVID lab
                    tests. To ensure the project was able to reach its eventual 500,000 samples a day, It required a new 
                    specimen pooling module to provide a large increase in performance to enable the massive throughput 
                    of samples required. 
                </p>
                <div className="row">

                    <div className="column large-6 tab-full">
                        <p>
                            - A screen for specimen entry via barcodes, a query browser for viewing, processing, and 
                            generating pooling statistics as well as a number of other screens for displaying other 
                            information using OpenEdge Ultra Controls for Microsoft .NET framework.
                        </p>
                    </div>
                    <div className="column large-6 tab-full">
                        <p>
                            - Functions for the in-house scripting language MISPL.
                        </p>
                    </div>
                    <div className="column large-6 tab-full">
                        <p>
                            - Database schema and backend code to handle the above features.
                        </p>
                    </div>

                </div>
                <cite>See : <a href="https://publicadministration.un.org/unpsa/innovation-hub/Special-Category-on-covid-19-response/Everything-gurgles_Alles-gurgelt">
                        https://publicadministration.un.org/unpsa/innovation-hub/Special-Category-on-covid-19-response/Everything-gurgles_Alles-gurgelt
                    </a>
                </cite> 
            </div>
            <div id="SegurNumerique">
                <h5>Ségur numérique</h5>
                <p>
                    Worked on the “Ségur numérique” project, where the french government mandated a large 
                    extension in compliance standards to improve security and access to healthcare data for 
                    physicians and patients. 
                </p>
                <div className="row">

                    <div className="column large-6 tab-full">
                        <p>
                            - Building a high performance patient search system, using a dynamically 
                            generated query.

                        </p>
                    </div>
                    <div className="column large-6 tab-full">
                        <p>
                            - Building a system to convert patient data to the new compliance standard 
                            at scale.
                        </p>
                    </div>
                    <div className="column large-6 tab-full">
                        <p>
                            - A reporting system for transferring data to a central government server.
                        </p>
                    </div>

                </div>
                <cite>See : <a href="https://esante.gouv.fr/segur/biologie-medicale">
                        https://esante.gouv.fr/segur/biologie-medicale
                    </a>
                </cite>
            </div>
        </div>
    );
}

export default ProjectsPage;