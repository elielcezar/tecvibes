'use client'

import React, { useState } from 'react'
import { FaPaperPlane, FaSpinner, FaCheck, FaExclamationCircle } from 'react-icons/fa'
import './Newsletter.css'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) return

        setStatus('loading')
        setMessage('')

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao se inscrever.')
            }

            setStatus('success')
            setMessage('Sucesso! Verifique seu email para confirmar. Se não receber, verifique a caixa de spam.')
            setEmail('')
            setName('')

        } catch (error) {
            console.error('Newsletter error:', error)
            setStatus('error')
            setMessage('Ocorreu um erro. Tente novamente.')
        }
    }

    return (
        <div className="newsletter-section">
            <div className="container">
                <div className="newsletter-content">
                    <div className="newsletter-text">
                        <h3>Inscreva-se na nossa Newsletter</h3>
                        <p>Receba as últimas notícias de tecnologia e atualizações exclusivas diretamente na sua caixa de entrada.</p>
                    </div>

                    <div className="newsletter-form-wrapper">
                        {status === 'success' ? (
                            <div className="newsletter-success">
                                <FaCheck className="success-icon" />
                                <p>{message}</p>
                                <button onClick={() => setStatus('idle')} className="btn-reset">
                                    Inscrever outro email
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="newsletter-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Seu nome (opcional)"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="newsletter-input"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        placeholder="Seu melhor email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="newsletter-input"
                                        required
                                        disabled={status === 'loading'}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="newsletter-button"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <FaSpinner className="spinner" />
                                    ) : (
                                        <>
                                            Inscrever <FaPaperPlane />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {status === 'error' && (
                            <div className="newsletter-error">
                                <FaExclamationCircle /> {message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}