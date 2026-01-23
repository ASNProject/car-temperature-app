// Copyright 2025 ariefsetyonugroho
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

// Update vehicle location + UI pressure info
function updateLocation() {
    fetch(`${API_URL}/carpulses`)
        .then(response => response.json())
        .then(json => {
            const list = json.data.data;

            if (!Array.isArray(list) || list.length === 0) {
                console.warn("Tidak ada data kendaraan. Tunggu data masuk...");
                return;
            }

            const v = list[0]; // Ambil data pertama

            console.log("API result:", v);

            // ========================
            // UPDATE TEKANAN BAN
            // ========================

            document.querySelector(".pressure-box.fl span").textContent = v.b_front_left + " °C";
            document.querySelector(".pressure-box.rl span").textContent = v.b_back_left + " °C";
            document.querySelector(".pressure-box.rr span").textContent = v.b_back_right + " °C";

            // Kelas FR kamu salah, diganti jadi pressure-box fr
            const frBox = document.querySelector(".pressure-box.fr-text-mismatch span");
            if (frBox) frBox.textContent = v.b_front_right + " °C";

            setPressure(".pressure-box.fl", v.b_front_left);
            setPressure(".pressure-box.rl", v.b_back_left);
            setPressure(".pressure-box.rr", v.b_back_right);

            // FR (class kamu memang beda)
            setPressure(".pressure-box.fr-text-mismatch", v.b_front_right);


            // ========================
            // UPDATE BATTERY BAN
            // ========================

            document.querySelector(".fl-battery span").textContent = "Battery: " + v.bat_front_left + "%";
            document.querySelector(".fr-battery span").textContent = "Battery: " + v.bat_front_right + "%";
            document.querySelector(".rl-battery span").textContent = "Battery: " + v.bat_back_left + "%";
            document.querySelector(".rr-battery span").textContent = "Battery: " + v.bat_back_right + "%";

            setBattery(".fl-battery", v.bat_front_left);
            setBattery(".fr-battery", v.bat_front_right);
            setBattery(".rl-battery", v.bat_back_left);
            setBattery(".rr-battery", v.bat_back_right);


            // ========================
            // UPDATE STATUS BAN
            // ========================

            document.querySelector(".fl-status span").textContent = v.s_front_left;
            document.querySelector(".fr-status span").textContent = v.s_front_right;
            document.querySelector(".rl-status span").textContent = v.s_back_left;
            document.querySelector(".rr-status span").textContent = v.s_back_right;

            // ========================
            // UPDATE SPEED
            // ========================

            document.querySelector(".speed-number").textContent = v.speed;

        })
        .catch(error => console.error('Error fetching vehicle data:', error));
}

function setPressure(boxSelector, value) {
    const box = document.querySelector(boxSelector);
    if (!box) return;

    box.querySelector("span").textContent = value + " °C";

    if (value > 360) {
        box.style.backgroundColor = "#dc3545"; 
    } else {
        box.style.backgroundColor = "#4a90e2"; 
    }
}

function setBattery(boxSelector, value) {
    const box = document.querySelector(boxSelector);
    if (!box) return;

    box.querySelector("span").textContent = "Battery: " + value + "%";

    if (value < 10) {
        box.style.backgroundColor = "#dc3545"; 
        box.style.color = "#fff";
    } else {
        box.style.backgroundColor = "#198754"; 
        box.style.color = "#fff";
    }
}


function openMaps() {
    window.open('maps.html', '_blank');
}

setInterval(updateLocation, 1000);
updateLocation();
