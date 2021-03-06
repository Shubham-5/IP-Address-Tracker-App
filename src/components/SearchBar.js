import { React, useState } from "react";

const SearchBar = ({ setUserData }) => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);

  // Get Details From Form Submit
  const formHandler = async (e) => {
    e.preventDefault();
    try {
      if (address) {
        await fetch(
          `https://geo.ipify.org/api/v1?apiKey=at_xzlpTT7dNpNfP7D0NMM3RnZ9bf6Sd&ipAddress=${address}`
        )
          .then((response) => response.json())

          .then((data) =>
            setUserData({
              ip: data.ip,
              location: data.location,
              timezone: `UTC${data.location.timezone}`,
              isp: data.isp,
              latlng: [data.location.lat, data.location.lng],
            })
          );
        setError(false);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
    setAddress("");
  };
  return (
    <>
      <form
        id='form'
        className='input-container pos-rel'
        onSubmit={formHandler}>
        <input
          type='text'
          name='ip-address'
          placeholder='Search for any IP address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type='submit'>
          <svg xmlns='http://www.w3.org/2000/svg' width='11' height='14'>
            <path fill='none' stroke='#FFF' stroke-width='3' d='M2 1l6 6-6 6' />
          </svg>
        </button>
      </form>
      {error && (
        <div className='Input-Error '>
          <h4>Please try again</h4>
        </div>
      )}
    </>
  );
};

export default SearchBar;
