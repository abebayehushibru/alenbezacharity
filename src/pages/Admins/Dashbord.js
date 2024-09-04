import React from 'react'

const Dashbord = () => {
  return (
    <div className=' flex flex-1 flex-col'>
        <h2> Dashboad</h2>
        <div>
            {/* to row  */}
            <div>
                <div> number of members </div>
                <div> number of post </div>
                <div> number of gift </div>
                <div> This year money </div>
            </div>
              {/* 2nd row  */}
              <div>
                {/* column  1*/}
                <div>
                    <div>
                        sign chart which describe  all month of the  current  year payments  
                    </div>
                    <div>
                        table which describe transaction of these year
                    </div>
                </div>
                 {/* column 2*/}
                 <div>
                 width 250px 
                 piechart 

                 </div>
                

              </div>
        </div>
    </div>
  )
}

export default Dashbord