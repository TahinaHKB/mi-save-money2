import React from 'react';
const Formulaire = () => {
    return (
        <div>
            <form >

                <label >Objetctif :</label>
                <input type="text" name="" id="" />
                <input type="button" value="Envoyer" />
            </form>
            <form >
                
             


            </form>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                Open modal
            </button>


            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">


                        <div class="modal-header">
                            <h4 class="modal-title">Modal Heading</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>


                        <div class="modal-body">
                        <select name="" id="">
                    <option value="">Depense </option>
                    <option value="">revenue    </option>
                </select> 
                        </div>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}
export default Formulaire;