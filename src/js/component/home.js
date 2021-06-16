import React, { useRef, useState, useEffect } from "react";

export function Home() {
	let [songList, setSongListAsync] = useState([]);

	useEffect(() => {
		obtenerList();
	}, []);

	const obtenerList = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setSongListAsync(data);
		} catch (error) {
			console.log(error);
		}
	};

	let music = useRef();

	const [isPlaying, setPlaying] = useState(false);

	const playPause = () => {
		if (music.current.paused) {
			music.current.play();

			setPlaying(true);
		} else if (!music.current.paused) {
			music.current.pause();
			setPlaying(false);
		}
	};

	const [songActual, setSongActual] = useState();

	const prevSong = () => {
		let prev = songActual - 1;
		if (prev <= 0) {
			prev = songList.length - 1;
		}
		cambiarSrc(songList[prev].url, prev);
	};
	const nextSong = () => {
		let next = songActual + 1;
		if (next > songList.length - 1) {
			next = 0;
		}
		cambiarSrc(songList[next].url, next);
	};

	const cambiarSrc = (url, song) => {
		let string = "https://assets.breatheco.de/apis/sound/";
		music.current.src = string + url;
		setSongActual(song);
		music.current.play();
		setPlaying(true);
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-12">
						<div>
							<div id="content">
								{songList.map((objeto, index) => {
									return (
										<div
											className="song"
											key={index}
											onClick={() => {
												cambiarSrc(objeto.url, index);
											}}>
											<div>
												<span>
													{objeto.id}
													{" - "}
												</span>
												<span>{objeto.name}</span>
											</div>
										</div>
									);
								})}
							</div>
							<audio ref={music} src={songList.url}></audio>
							<div className="btn-group">
								<button
									className="btn  btn-l"
									onClick={prevSong}>
									<i className="fas fa-caret-square-left fa-2x boton" />
								</button>
								<button
									className="btn  btn-l"
									onClick={playPause}>
									{isPlaying ? (
										<i className="fas fa-pause fa-2x boton"></i>
									) : (
										<i className="far fa-play-circle fa-2x boton"></i>
									)}
								</button>
								<button
									className="btn  btn-l"
									onClick={nextSong}>
									<i className="fas fa-caret-square-right fa-2x boton" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
