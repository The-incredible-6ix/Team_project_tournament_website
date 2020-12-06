/**
 * add tournament btn click
 */
$('#addBtn').click(()=>{

    let mName = $('#mName').val()
    let mNumber = $('#mNumber').val()
    let mPlayers = $('#mPlayers').val()
    let mActiveTime = $('#mActiveTime').val()
    let mDescription = $('#mDescription').val()

    /**
     * Verification starts
     */
    let pass = {
        mName: false,
        mNumber: false,
        mPlayers: false,
        mActiveTime: false,
        mDescription: false
    }


    //tournament name cannot be empty
    mName.trim() !== ''?  pass.mName = true : ''
    //friendly prompt
    if(pass.mName === false) {
        swal("Opps!", "Tournament name cannot be empty!", "error")
        $('#mName').focus()
        return
    }

    //the number of players should be greater than 1
    mNumber >= 2? pass.mNumber = true : ''
    //friendly prompt
    if(pass.mNumber === false) {
        swal("Opps!", "There should be more than 2 players", "error")
        $('#mNumber').focus()
        return
    }

    //the players names should equal to the number of players
    let mPlayersArr = mPlayers.split(',')
    Number(mNumber) === mPlayersArr.length ? pass.mPlayers=true:''
    //friendly prompt
    if(pass.mPlayers === false) {
        swal("Opps!", mNumber +" players are expected to enter!", "error")
        $('#mPlayers').focus()
        return
    }

    //the date cannot be earlier than the day the tournament created
    let mActiveTimeArr = mActiveTime.split('-')
    let startDate = new Date(mActiveTimeArr[0], mActiveTimeArr[1]-1, mActiveTimeArr[2])
    startDate>new Date()? pass.mActiveTime=true:''
    //friendly prompt
    if(pass.mActiveTime === false) {
        swal("Opps!", "The date of tournament cannot be earlier than today", "error")
        $('#mActiveTime').focus()
        return
    }

    //tournament description cannot be empty
    mDescription.trim() !== ''?  pass.mDescription = true : ''
    //friendly prompt
    if(pass.mDescription === false) {
        swal("Opps!", "Please write a brief description for your tournament!", "error")
        $('#mDescription').focus()
        return
    }

    let addable = false
    for(let key in pass){
        if(pass[key]===false){
            return
        }
        addable = true
    }

    if(addable !== true){
        return
    }

    $.post('/matches/addTournament', {
        mName: mName,
        mNumber:mNumber,
        mPlayers:mPlayers,
        mActiveTime:mActiveTime,
        mDescription:mDescription
    }, (data) =>{
        if(data==='1'){
            //add successfully
            spop({
                template: 'Yah! You have created a tournament!',
                position  : 'Position top left',
                style: 'success',
                autoclose: 2000,
                onClose: ()=>{
                    window.location='/matches/'
                }
            })
        }else if(data==='-2'){
            //server error
            spop({
                template: 'Opps! There is something wrong withthe server. Please contact the admin. The error code is -2.',
                position  : 'top-top-right',
                style: 'error',
                autoclose: 2000,
                    onClose: ()=>{
                        window.location='/matches/'
                    }
            })

        }
    })
})

/**
 * delete btn click
 */
$('#delBtn').click(()=>{
    console.log($('#delBtn').attr('mName'))
    let code = $('#delBtn').attr('mName')

    swal("If you would like to delete this tournament, please type \""+code+'\"', {
        content: "input",
    })
        .then((value) => {
            if(value === code){
                let mId = $('#delBtn').attr('mId')
                $.get('/matches/deleteTournament/'+mId, (data) => {
                    if(data==='1'){
                        swal({
                            title: "Good job!",
                            text: "You have deleted this tournament",
                            icon: "success",
                            button: "I know",
                        }).then(()=>{
                            window.location = '/matches'
                        })
                    }
                })
            }else{
                swal(`Your tournament is safe.`);
            }
        })
})