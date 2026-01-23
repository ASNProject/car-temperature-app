// Copyright 2026 ariefsetyonugroho
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// ===============================
// INIT MAP
// ===============================
const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

let marker = null;

// ===============================
// UPDATE LOCATION REALTIME
// ===============================
function updateLocation() {
    fetch(`${API_URL}/carpulses`)
        .then(res => res.json())
        .then(json => {
            const list = json.data.data;

            if (!Array.isArray(list) || list.length === 0) {
                console.warn("Tidak ada data kendaraan");
                return;
            }

            const v = list[0];

            if (!v.latitude || !v.longitude) {
                console.warn("Latitude / Longitude kosong");
                return;
            }

            const lat = v.latitude;
            const lon = v.longitude;

            if (marker) {
                marker.setLatLng([lat, lon]);
            } else {
                marker = L.marker([lat, lon]).addTo(map);
                map.setView([lat, lon], 16);
            }
        })
        .catch(err => console.error("Map error:", err));
}

setInterval(updateLocation, 1000);
updateLocation();