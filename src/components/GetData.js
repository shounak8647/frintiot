import React, {useState, useEffect} from 'react';
import {appUrl, cookie} from '../config';

export function getRooms() {
  const [project, setProject] = useState(null);
  const getData = async () => {
    try {
      const req = await fetch(`${appUrl}/project/60b2976c8ed905d7a7ff9573`, {
        headers: {
          Cookie: `Authorization=${cookie}`,
        },
      });
      console.log(appUrl, req.status);
      if (req.status == 200) {
        const res = await req.json();
        setProject(res);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      alert('Error: ' + err);
    }
  };
}

export async function getAddRoomIcons() {
  try {
    const req = await fetch(`${appUrl}/static/icons/rooms`, {
      headers: {
        Cookie: cookie,
      },
    });
    console.log(appUrl, req.status);
    if (req.status == 200) {
      const res = await req.json();
      console.log(res);
      setIcons(res);
    } else {
      alert('Something went wrong');
    }
  } catch (err) {
    alert('Error: ' + err);
  }
}

export async function getDevices() {
  try {
    const req = await fetch(`${appUrl}/device/list`, {
      method: 'POST',
      headers: {
        Cookie: `Authorization=${cookie}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: '60b2976c8ed905d7a7ff9573',
        roomId: '60ca7757fbb86913c91775de',
      }),
    });
    if (req.status == 200) {
      const res = await req.json();
      console.log(res);
      setDevice(res);
    } else {
      alert('Something went wrong');
    }
  } catch (err) {
    alert(err);
  }
}

export async function getAddDeviceIcons() {
  try {
    const req = await fetch(`${appUrl}/static/icons/devices`, {
      headers: {
        Cookie: cookie,
      },
    });
    console.log(appUrl, req.status);
    if (req.status == 200) {
      const res = await req.json();
      console.log(res);
      setIcons(res);
    } else {
      alert('Something went wrong');
    }
  } catch (err) {
    alert('Error: ' + err);
  }
}
