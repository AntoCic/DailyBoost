# Path del file di configurazione
$configFilePath = ".\config.json"
# Path del file di backup
$backupFilePath = ".\config_backup.json"

# Funzione per effettuare il backup delle configurazioni esistenti
function Backup-Configurations {
    Write-Host "Eseguendo il backup delle configurazioni esistenti..."
    firebase functions:config:get > $backupFilePath
    Write-Host "Backup completato. Salvato in $backupFilePath`n"
}

# Funzione per eliminare tutte le configurazioni esistenti
function Remove-AllConfigurations {
    Write-Host "Rimuovendo tutte le configurazioni esistenti..."
    $keys = (firebase functions:config:get | ConvertFrom-Json | Get-Member -MemberType NoteProperty).Name
    foreach ($key in $keys) {
        firebase functions:config:unset $key | Out-Null
    }
    Write-Host "Tutte le configurazioni sono state rimosse.`n"
}

# Funzione per eliminare tutte le configurazioni esistenti
function Copy-Config {
    Copy-Item config.json .runtimeconfig.json
    Write-Host "Copiato il config.json in .runtimeconfig.json"
}

function Flatten-Config {
    param(
        [object]$obj,
        [string]$prefix = ""
    )
    $flattened = @{}

    if ($obj -is [PSCustomObject]) {
        foreach ($property in $obj.PSObject.Properties) {
            $key = if ($prefix) { "$prefix.$($property.Name)" } else { $property.Name }
            $value = $property.Value
            if ($value -is [PSCustomObject] -or $value -is [System.Collections.IEnumerable]) {
                $nested = Flatten-Config -obj $value -prefix $key
                $flattened += $nested
            } else {
                $flattened[$key] = $value
            }
        }
    } elseif ($obj -is [System.Collections.IEnumerable] -and -not ($obj -is [string])) {
        $index = 0
        foreach ($item in $obj) {
            $key = "$prefix[$index]"
            $nested = Flatten-Config -obj $item -prefix $key
            $flattened += $nested
            $index++
        }
    } else {
        $flattened[$prefix] = $obj
    }
    return $flattened
}

# Funzione per impostare le nuove configurazioni
function Set-NewConfigurations {
    # Leggi il contenuto del file di configurazione
    $configContent = Get-Content $configFilePath -Raw
    $configObject = $configContent | ConvertFrom-Json

    # Appiattisci la configurazione
    $flatConfig = Flatten-Config -obj $configObject

    # Costruisci il comando firebase functions:config:set
    $setArgs = @()
    foreach ($key in $flatConfig.Keys) {
        $value = $flatConfig[$key]
        # Escape delle virgolette doppie
        $escapedValue = $value -replace '"', '\"'
        # Racchiudi il valore tra virgolette
        $escapedValue = "`"$escapedValue`""
        $setArgs += "$key=$escapedValue"
    }

    $command = "firebase functions:config:set " + ($setArgs -join ' ')

    Write-Host "Eseguendo comando: $command"

    # Esegui il comando
    Invoke-Expression $command

    Write-Host "Configurazioni aggiornate con successo."
}

# Funzione per scaricare le configurazioni attuali in config.json
function Download-CurrentConfigurations {
    Write-Host "Scaricando le configurazioni attuali in $configFilePath..."
    firebase functions:config:get > $configFilePath
    Write-Host "Configurazioni scaricate con successo.`n"
}

# Gestione parametri con $args
if ($args -contains "-u" -or $args -contains "-update") {
    Write-Host "Avviando il processo di aggiornamento..."
    Backup-Configurations
    Remove-AllConfigurations
    Set-NewConfigurations
    Copy-Config
    Write-Host "Processo di aggiornamento completato con successo."
} elseif ($args -contains "-p" -or $args -contains "-pull") {
    Write-Host "Scaricando le configurazioni attuali..."
    Backup-Configurations
    Download-CurrentConfigurations
    Write-Host "Le configurazioni attuali sono state scaricate in $configFilePath."
} else {
    Write-Host "Seleziona un'opzione:"
    Write-Host "u. Aggiornare le configurazioni (backup, rimozione, impostazione nuove configurazioni e deploy)"
    Write-Host "p. Scaricare le configurazioni attuali in config.json"
    $choice = Read-Host "Inserisci u o p"

    if ($choice -eq "u") {
        Write-Host "Avviando il processo di aggiornamento..."
        Backup-Configurations
        Remove-AllConfigurations
        Set-NewConfigurations
        Copy-Config
        Write-Host "Processo di aggiornamento completato con successo."
    } elseif ($choice -eq "p") {
        Write-Host "Scaricando le configurazioni attuali..."
        Backup-Configurations
        Download-CurrentConfigurations
        Write-Host "Le configurazioni attuali sono state scaricate in $configFilePath."
    } else {
        Write-Host "Scelta non valida. Uscita dallo script."
    }
}
