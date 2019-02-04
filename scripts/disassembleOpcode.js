function disassembleOpcode (opcode) {
	let code = parseInt(`${opcode}`, 16);	// 1111-2222-3333-4444
    let x = (code & 0x0F00) >>> 8;          // 0x00
    let y = (code & 0x00F0) >>> 4;          // 00y0
	let kk = code & 0x00FF;                 // 00kk
	let nnn = code & 0x0FFF;				// 0nnn

	x = x.toString(16);
	y = y.toString(16);
	kk = kk.toString(16);
	nnn = nnn.toString(16);
	
	let str;
	switch (code & 0xF000) {
		case 0x0000:
			
			switch (code & 0x00FF) {

				case 0x00E0:

					// 00E0 - CLS
					str = "00E0 CLS";
					break; 

				case 0x00EE:

					// 00EE - RET
					str = "00EE RET";
					break;
			}

			break;

		case 0x1000:

			// 1nnn - JP addr
			str = `1${nnn} JP ${nnn}`;
			break;

		case 0x2000:

			// 2nnn - CALL addr
			str = `2${nnn} CALL ${nnn}`;
			break;

		case 0x3000:

			// 3xkk - SE Vx, byte
			str = `3${x}${kk} SE V${x}, ${kk}`;
			break;

		case 0x4000:

			// 4xkk - SNE Vx, byte
			str = `4${x}${kk} SNE V${x}, ${kk}`;
			break;

		case 0x5000:

			// 5xy0 - SE Vx, Vy
			str = `5${x}${y}0 SE V${x}, V${y}`;
			break;

		case 0x6000:

			// 6xkk - LD Vx, byte
			str = `6${x}${kk} LD V${x}, ${kk}`;
			break;

		case 0x7000:

			// 7xkk - ADD Vx, byte
			str = `7${x}${kk} ADD V${x}, ${kk}`;
			break;

		case 0x8000:

			switch (code & 0x000F) {

				case 0x0000:

					// 8xy0 - LD Vx, Vy
					str = `8${x}${y}0 LD V${x}, V${y}`;
					break;

				case 0x0001:

					// 8xy1 - OR Vx, Vy
					str = `8${x}${y}1 OR V${x}, V${y}`;
					break;

				case 0x0002:

					// 8xy2 - AND Vx, Vy
					str = `8${x}${y}2 AND V${x}, V${y}`;
					break;

				case 0x0003:

					// 8xy3 - XOR Vx, Vy
					str = `8${x}${y}3 XOR V${x}, V${y}`;
					break;

				case 0x0004:

					// 8xy4 - ADD Vx, Vy
					str = `8${x}${y}4 ADD V${x}, V${y}`;
					break;

				case 0x0005:

					// 8xy5 - SUB Vx, Vy
					str = `8${x}${y}5 SUB V${x}, V${y}`;
					break;

				case 0x0006:

                    // 8xy6 - SHR Vx {, Vy}
					str = `8${x}${y}6 SHR V${x} {, V${y}}`;
					break;

				case 0x0007:

					// 8xy7 - SUBN Vx, Vy
					str = `8${x}${y}7 SUBN V${x}, V${y}`;
					break;

				case 0x000E:

                    // 8xyE - SHL Vx {, Vy}
					str = `8${x}${y}E SHL V${x} {, V${y}}`;
                    break;

			}
			break;

		case 0x9000:

			// 9xy0 - SNE Vx, Vy
			str = `9${x}${y}0 SNE V${x}, V${y}`;
			break;

		case 0xA000:

			// Annn - LD I, addr
			str = `A${nnn} LD I, ${nnn}`;
			break;

		case 0xB000:

			// Bnnn - JP V0, addr
			str = `B${nnn} JP V0, ${nnn}`;
			break;

		case 0xC000:

			// Cxkk - RND Vx, byte
			str = `C${x}${kk} RND V${x}, ${kk}`;
			break;

		case 0xD000:

			// Dxyn - DRW Vx, Vy, nibble
			let n = code & 0x000F;
			str = `D${x}${y}${n} DRW V${x}, V${y}, ${n}`;
			break;

		case 0xE000:

			switch (code & 0x00FF) {

				case 0x009E:

					// Ex9E - SKP Vx
					str = `E${x}9E SKP V${x}`;
					break;

				case 0x00A1:

					// ExA1 - SKNP Vx
					str = `E${x}A1 SKNP V${x}`;
					break;
			}
			break;

		case 0xF000:

			switch (code & 0x00FF) {

				case 0x0007:

					// Fx07 - LD Vx, DT
					str = `F${x}07 LD V${x}, DT`;
					break;

				case 0x000A:

					// Fx0A - LD Vx, K
					str = `F${x}0A LD V${x}, K`;
					break;

				case 0x0015:

					// Fx15 - LD DT, Vx
					str = `F${x}15 LD DT, V${x}`;
					break;

				case 0x0018:

					// Fx18 - LD ST, Vx
					str = `F${x}18 LD ST, V${x}`;
					break;

				case 0x001E:

                    // Fx1E - ADD I, Vx
					str = `F${x}1E ADD I, V${x}`;
					break;

				case 0x0029:

                    // Fx29 - LD F, Vx
					str = `F${x}29 LD F, V${x}`;
					break;

				case 0x0033:

					// Fx33 - LD B, Vx
					str = `F${x}33 LD B, V${x}`;
					break;

				case 0x0055:

                    // Fx55 - LD [I], Vx
					str = `F${x}55 LD [I], V${x}`;
					break;

				case 0x0065:

                    // Fx65 - LD Vx, [I]
					str = `F${x}65 LD V${x}, [I]`;
					break;

			}
            break;
            // no default case (is it needed?)
	}
	
	let node = document.createElement("li");
	let text_node = document.createTextNode(str);
	node.appendChild(text_node);
	document.getElementById("here").appendChild(node);
}