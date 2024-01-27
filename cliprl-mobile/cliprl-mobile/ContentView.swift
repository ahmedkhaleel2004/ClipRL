//
//  ContentView.swift
//  cliprl-mobile
//
//  Created by Shaaf Shahzad on 2024-01-27.
//

import SwiftUI
import AVFoundation
import UIKit

struct ContentView: View {
    var body: some View {
        CameraView()
    }
}

class CameraManager: NSObject, AVCaptureVideoDataOutputSampleBufferDelegate {
    var captureSession: AVCaptureSession?
    private var frameBuffer: [Data] = []
    private let bufferLimit = 900  // 30fps * 30seconds
    private var previousTimestamp: CMTime = CMTime.zero
    private var frameCount: Int = 0

    override init() {
        super.init()
        setupCaptureSession()
    }

    private func setupCaptureSession() {
        let session = AVCaptureSession()

        // configure the rear camera
        guard let camera = AVCaptureDevice.default(.builtInWideAngleCamera, for: .video, position: .back) else {
            fatalError("No rear camera available.")
        }

        do {
            try camera.lockForConfiguration()
            camera.activeVideoMinFrameDuration = CMTimeMake(value: 1, timescale: 30)
            camera.activeVideoMaxFrameDuration = CMTimeMake(value: 1, timescale: 30)
            camera.unlockForConfiguration()
        } catch {
            fatalError("Error setting camera frame rate: \(error)")
        }

        do {
            let input = try AVCaptureDeviceInput(device: camera)
            if session.canAddInput(input) {
                session.addInput(input)
            }
        } catch {
            fatalError("Error setting up camera input: \(error)")
        }

        // add video output
        let videoOutput = AVCaptureVideoDataOutput()
        videoOutput.videoSettings = [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA]

        if session.canAddOutput(videoOutput) {
            session.addOutput(videoOutput)
            videoOutput.setSampleBufferDelegate(self, queue: DispatchQueue(label: "videoQueue"))
        } else {
            fatalError("Could not add video output")
        }

        captureSession = session
    }

    func startRunning() {
        DispatchQueue.global(qos: .userInitiated).async { [weak self] in
            self?.captureSession?.startRunning()
        }
    }

    func captureOutput(_ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer, from connection: AVCaptureConnection) {
            DispatchQueue.main.async { [weak self] in
                guard let self = self else { return }
                
                print("Current buffer size: \(self.frameBuffer.count)")
                
                if let image = self.convertSampleBufferToUIImage(sampleBuffer: sampleBuffer),
                   let compressedData = image.jpegData(compressionQuality: 0.5) {
                    self.frameBuffer.append(compressedData)

                    if self.frameBuffer.count > self.bufferLimit {
                        self.frameBuffer.removeFirst()
                    }
                }
            }
        }
    
    private func convertSampleBufferToUIImage(sampleBuffer: CMSampleBuffer) -> UIImage? {
            guard let imageBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return nil }
            let ciImage = CIImage(cvImageBuffer: imageBuffer)
            let context = CIContext(options: nil)
            guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else { return nil }
            return UIImage(cgImage: cgImage)
        }
}

struct CameraView: UIViewRepresentable {
    let cameraManager = CameraManager()

    func makeUIView(context: Context) -> UIView {
        let view = UIView(frame: UIScreen.main.bounds)
        cameraManager.startRunning()

        guard let captureSession = cameraManager.captureSession else {
            fatalError("Capture session is not available.")
        }

        let previewLayer = AVCaptureVideoPreviewLayer(session: captureSession)
        previewLayer.frame = view.bounds
        previewLayer.videoGravity = .resizeAspectFill
        view.layer.addSublayer(previewLayer)
        
        return view
    }

    func updateUIView(_ uiView: UIView, context: Context) {}
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
