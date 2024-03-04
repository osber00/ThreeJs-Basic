"use client"

import { useEffect, useRef } from "react"
import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from "three"

const HomePage = ()=>{

  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canva = canvaRef.current
    if (!canva) {
      return
    }

    const anchoPatalla = window.innerWidth
    const altoPantalla = window.innerHeight

    const escena = new Scene()
    const camara = new PerspectiveCamera(
      75,
      anchoPatalla / altoPantalla,
      0.1,
      1000
    )
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas: canva
    })

    //Configurar renderer
    renderer.setSize(anchoPatalla, altoPantalla)

    //Cubo
    const geometria = new BoxGeometry(2,2,2)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const cubo = new Mesh(geometria, material)

    //Agregar el cubo a la escena
    escena.add(cubo)

    //Configurar cámara
    camara.position.z = 7

    //Función para animar
    const animacion = ()=>{
      requestAnimationFrame(animacion)
      cubo.rotation.y += 0.01
      //cubo.position.z += 0.01
      //cubo.rotation.y += 0.01
      renderer.render(escena, camara)
    }

    //Ejecutar animación
    animacion()

  }, [])

  return (
    <canvas ref={canvaRef}></canvas>
  )
}

export default HomePage;